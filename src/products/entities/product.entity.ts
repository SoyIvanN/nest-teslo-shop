
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: 'bf1808c7-a83e-4c3b-b476-875b67bc99b4',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-shirt Teslo',
        description: 'Product Title',
        uniqueItems:true
    })
    @Column('text', {
        unique:true,
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product Price',
    })
    @Column('float', {
        default: 0
    })
    price: number;

   @ApiProperty({
        example: 'Anim reprehenderit nulla in anim mollit minim irure commodo',
        description: 'Product Description',
        default: null
    })
    @Column({
        type:'text',
        nullable: true
    })
    description:string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems:true
    })
    @Column('text', {
        unique:true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product Stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['M','XL','XXL'],
        description: 'Product sizes',
    })
    @Column('text', {
        array:true
    })
    sizes: string[];

    @ApiProperty({
        example: 'women',
        description: 'Product gender',
    })
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text',{
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User


    @BeforeInsert()
    checkSlugInsert() {
        
        if ( !this.slug ){
            this.slug = this.title.toLowerCase().replaceAll(' ','_').replaceAll("'",'');
        }

        this.slug = this.slug.toLowerCase().replaceAll(' ','_').replaceAll("'",'');
        
    }

    @BeforeUpdate()
    checkSlugUpdate() {

        this.slug = this.slug.toLowerCase().replaceAll(' ','_').replaceAll("'",'');

    }

}
