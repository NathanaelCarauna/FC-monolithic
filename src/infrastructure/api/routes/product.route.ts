import express, { Request, Response} from 'express';
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory';
import { AddProductFacadeInputDto } from '../../../modules/product-adm/facade/product-adm.facade.interface';

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response) => {
    const productFacade = ProductAdmFacadeFactory.create();
    try {
        const input: AddProductFacadeInputDto = {
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            purchasePrice: req.body.purchasePrice,            
        }
        await productFacade.addProduct(input);
        res.status(201).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})