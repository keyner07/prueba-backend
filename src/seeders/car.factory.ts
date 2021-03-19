import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { CarEntity } from "../entity";

define(CarEntity, (faker: typeof Faker, user: number | undefined) => {
    const name = faker.vehicle.vehicle();
    const year = faker.random.number(2021);
    const color = faker.commerce.color();
    const userId = user;

    const car = new CarEntity({name,year,color,userId});
    return car;
})