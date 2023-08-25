// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import catagoriesJson from '../data/catagories.json';

import productsJson from '../data/products.json';
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create two dummy articles
    const catagories = await prisma.category.createMany({
        data: catagoriesJson.catagories
    });
    let properties_id = []
    for (let i = 0; i < productsJson.products.length; i++) {
        for (let j = 0; j < productsJson.products[i].properties.length; j++) {
            properties_id.push({
                dp_id: String(productsJson.products[i].properties[j].dp_id),
                code: String(productsJson.products[i].properties[j].code),
                custom_name: productsJson.products[i].properties[j].custom_name,
                productId: productsJson.products[i].id
            })
        }
    }
    const productProperty = await prisma.productProperty.createMany({
        data: properties_id
    });
    console.log({ catagories });
    console.log({ productProperty });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });