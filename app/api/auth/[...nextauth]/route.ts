import * as bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '~/common/const/credential';
import { db } from '~/db';
import { Permission, Role, User, UserRoles } from '~/db/schema';
import { NotFoundException, UnauthorizedException } from '~/lib/handler/error';

const flattenRolePermission = (user: any): User => {
  const rolesArray: Role[] = [];
  const permissionsMap = new Map<number, Permission>();
  user.userRoles.forEach((ur: any) => {
    const role = ur.role;
    rolesArray.push({ id: role.id, name: role.name });
    role.rolePermissions.forEach((rp: any) => {
      const p = rp.permission;
      if (!permissionsMap.has(p.id)) {
        permissionsMap.set(p.id, { id: p.id, key: p.key, name: p.name });
      }
    });
  });
  const permissionsArray = Array.from(permissionsMap.values());
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roles: rolesArray,
    permissions: permissionsArray,
  };
};

const options: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: env.JWT_SECRET,
    maxAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        maxAge: 24 * 60 * 60,
      },
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'yourmail@mail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          const findUser = await db.user.findFirst({
            where: { email: credentials.email },
            include: {
              userRoles: {
                include: {
                  role: {
                    select: { id: true, name: true },
                    include: {
                      rolePermissions: {
                        include: {
                          permission: {
                            select: { id: true, key: true, name: true },
                          },
                        },
                      },
                    },
                  },
                },
              },
              customers: {
                select: { id: true },
              },
            },
          });
          if (!findUser) throw new NotFoundException('User not found');
          const isValid = await bcrypt.compare(credentials.password, findUser.password);
          if (!isValid) throw new UnauthorizedException('Invalid Password');
          const flatten = flattenRolePermission(findUser);
          console.log('findUser.customers: ', findUser.customers);
          return {
            ...flatten,
            customerId: findUser?.customers?.id ?? 0,
          };
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      if (token.email) {
        const findUser = await db.user.findFirst({
          where: { email: token.email as string },
          include: {
            userRoles: {
              include: {
                role: {
                  select: { id: true, name: true },
                  include: {
                    rolePermissions: {
                      include: {
                        permission: {
                          select: { id: true, key: true, name: true },
                        },
                      },
                    },
                  },
                },
              },
            },
            customers: {
              select: { id: true },
            },
          },
        });
        if (!findUser) return token;
        const userFlatten = flattenRolePermission(findUser);
        console.log('userFlatten: ', userFlatten);
        token.id = findUser.id;
        token.customerId = findUser?.customers?.id ?? 0;
        token.roles = userFlatten.roles;
        token.permissions = userFlatten.permissions;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.customerId = token.customerId;
        session.user.roles = token.roles;
        session.user.permissions = token.permissions;
      }
      return session;
    },

    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        const findUser = await db.user.findFirst({
          where: { email: profile.email },
        });
        if (!findUser) {
          const insertUser = await db.user.create({
            data: {
              name: profile.name ?? profile.email.split('@')[0],
              email: profile.email,
              phone: '',
              password: '',
            },
          });

          await db.userRole.create({
            data: {
              userId: insertUser.id,
              roleId: 1,
            },
          });

          await db.customer.create({
            data: {
              userId: insertUser.id,
            },
          });
          return true;
        }
        return true;
      }
      return true;
    },
  },

  pages: {
    signIn: '/auth/login',
  },
  secret: env.NEXT_SECRET,
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
