import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';
import createConnectionImplemented from '../index';

async function create() {
  const connection = await createConnectionImplemented('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXX')
    `,
  );

  connection.close();
}

create();
