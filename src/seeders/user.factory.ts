import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { DealerEntity, UserEntity } from "../entity";

define(UserEntity, (faker: typeof Faker, dealerId: DealerEntity | undefined) => {
    const name = faker.name.findName();
    const age = faker.random.number(50);
    const email = faker.internet.email();
    const password = faker.internet.password();
    const dealer = dealerId;

    const user = new UserEntity({name,age,email,password,dealer});
    return user;
})