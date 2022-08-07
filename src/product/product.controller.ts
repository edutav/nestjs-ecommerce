import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { ProductService } from './product.service';

@Controller('store/product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get('/')
	async getProducts(@Query() filterProductsDTO: FilterProductDTO) {
		if (Object.keys(filterProductsDTO).length) {
			const filterProducts = await this.productService.getFilteredProducts(filterProductsDTO);
			return filterProducts;
		} else {
			const allProducts = await this.productService.getAllProducts();
			return allProducts;
		}
	}

	@Get('/:id')
	async getProduct(@Param('id') id: string) {
		const product = await this.productService.getProduct(id);
		if (!product) throw new NotFoundException('Product does not exist');
		return product;
	}

	@Post('/')
	async addProduct(@Body() createProductDTO: CreateProductDTO) {
		const newProduct = await this.productService.addProduct(createProductDTO);
		return newProduct;
	}

	@Put('/:id')
	async updateProduct(@Body() createProductDTO: CreateProductDTO, @Param('id') id: string) {
		const updatedProduct = await this.productService.updateProduct(id, createProductDTO);
		if (!updatedProduct) throw new NotFoundException('Product does not exist');
		return updatedProduct;
	}

	@Delete('/:id')
	async deleteProduct(@Param('id') id: string) {
		const deletedProduct = await this.productService.deleteProduct(id);
		if (!deletedProduct) throw new NotFoundException('Product does not exist');
		return deletedProduct;
	}
}
