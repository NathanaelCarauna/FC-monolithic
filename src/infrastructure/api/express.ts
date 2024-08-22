import express, { Express } from "express";
import { clientRoute } from "./routes/client.route";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../modules/client-adm/repository/client.model";

import { productRoute } from "./routes/product.route";
import OrderModel from "../../modules/checkout/repository/order.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import { checkoutRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";
import CatalogProductModel from "../../modules/store-catalog/repository/product.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";

export const app: Express = express();
app.use(express.json());
app.use("/clients", clientRoute)
app.use("/products", productRoute)

app.use("/checkout", checkoutRoute)
app.use("/invoice", invoiceRoute)

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    })
    await sequelize.addModels([ClientModel, CatalogProductModel, OrderModel, InvoiceModel, ProductModel, TransactionModel])
    await sequelize.sync();
}

setupDb();