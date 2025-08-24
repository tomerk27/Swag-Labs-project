import { faker } from "@faker-js/faker"

export class loginDetails
{
    constructor(valid = true)
    {
        if (valid)
        {
            this.username = 'standard_user'
            this.password = 'secret_sauce'
        }
        else
        {
            this.username = faker.internet.username()
            this.password = faker.internet.password()
        }
    }
}