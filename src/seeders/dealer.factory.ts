import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { DealerEntity } from "../entity";

define(DealerEntity, (faker: typeof Faker) => {
    const name = faker.company.companyName();
    const address = faker.address.streetAddress();

    const dealer = new DealerEntity({name, address});
    return dealer;
})