
import { faker } from '@faker-js/faker';

export const users = [
  // Admin User
  {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    username: 'admin',
    displayUsername: 'Admin',
  },
  // Author Users
  ...Array.from({ length: 5 }, (_, i) => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'author',
    username: faker.internet.username(),
    displayUsername: faker.person.firstName(),
  })),
  // Standard Users
  ...Array.from({ length: 4 }, (_, i) => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'user',
    username: faker.internet.username(),
    displayUsername: faker.person.firstName(),
  })),
];

export const blogs = [
  ...Array.from({ length: 5 }, (_, i) => ({
    userId: `author-user-id-${i + 1}`,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
  })),
];

export const posts = Array.from({ length: 5 })
  .map((_, i) => {
    const blogId = i + 1;
    return [
      // Published Posts
      ...Array.from({ length: 3 }, () => ({
        blogId,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        excerpt: faker.lorem.paragraph(),
        published: true,
        publishedAt: faker.date.past(),
      })),
      // Unpublished Posts
      ...Array.from({ length: 2 }, () => ({
        blogId,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        excerpt: faker.lorem.paragraph(),
        published: false,
      })),
    ];
  })
  .flat();
