/* eslint-disable no-undef */
import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import createConnectionImplemented from '../../../../shared/infra/typeorm/index';
import app from '../../../../shared/infra/http/app';

let connection: Connection;

describe('Create a new category controller', () => {
  beforeAll(async () => {
    connection = await createConnectionImplemented();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXX')
      `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new category', async () => {
    // Authentication
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app).post('/categories').send({
      name: 'Category supertest name',
      description: 'Category supertest description',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new category with name already setted', async () => {
    // Authentication
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app).post('/categories').send({
      name: 'Category supertest name',
      description: 'Category supertest description',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(400);
  });
});
