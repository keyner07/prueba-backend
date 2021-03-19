import { Connection } from 'typeorm';
import * as faker from 'faker';
import { CarEntity, DealerEntity, UserEntity } from '../entity';

const createData = async (con: Connection): Promise<void> => {
    for (const _ of Array.from({ length: 10 })) {
        // User data
        const name = faker.name.findName();
        const age = faker.random.number({ min: 20, max: 60 });
        const email = faker.internet.email();
        const password = faker.internet.password();

        // Dealer data
        const nameDealer = faker.company.companyName();
        const address = faker.address.streetAddress();
        const dealer = new DealerEntity({ name: nameDealer, address });

        // Car data
        const nameCar = faker.vehicle.vehicle();
        const year = faker.random.number({ min: 1998, max: 2020 });
        const color = faker.commerce.color();

        const user = new UserEntity({ name, age, email, password, dealer });
        const car = new CarEntity({ name: nameCar, year, color, user });

        await con.manager.save(user);
        await con.manager.save(car);
    }
};

export { createData };
