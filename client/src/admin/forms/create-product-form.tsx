import React, { useState } from "react";
import { Form } from "react-final-form";
import { v4 } from "uuid";
// @ts-ignore
import { FilesField, FileItem } from "react-final-form-file-field";
import {
  Box,
  InputWithLabel,
  Text,
  Button,
  CheckboxWithLabel,
  InputFile,
} from "src/UI-kit";
import { AnimationPresenceBox, ColorPicker, Icon } from "../../components";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import useSnackbars from "src/hooks/useSnackbar";
import { useCategoriesHook } from "src/hooks/useCategories";
import { MultiSelect } from "../../components/select/multi-select";
import { ProductSearcher } from "../../containers/products/product-searcher/product-searcher";
import { useGetColors } from "../../api/color/useRequests";
import _ from "lodash";
import {
  GetProductsDocument,
  ProductInputType,
  useAddProductMutation,
} from "../../api";

const sizes = [
  {
    id: v4(),
    name: "XS",
  },
  {
    id: v4(),
    name: "S",
  },
  {
    id: v4(),
    name: "M",
  },
  {
    id: v4(),
    name: "L",
  },
  {
    id: v4(),
    name: "XL",
  },
  {
    id: v4(),
    name: "XXL",
  },
];

export type CreateProductDataType = {
  name: string;
  description: string;
  productDetail: string;
  sizes: { id: string; name: string }[];
  imageFiles: File[];
  color: string;
  price: string;
  kid: boolean;
  gender: string;
  variantsColor: { id: string; color: string }[];
  typeProduct: string[];
  linkProducts?: boolean;
};

const CreateProductDto = (data: CreateProductDataType) => ({
  name: data.name,
  description: data.description,
  productDetail: data.productDetail,
  sizes: data.sizes?.map((el) => el.name) || [],
  color: data.color,
  price: data.price,
  kid: data.kid || false,
  gender: data.gender,
  variantsColor: data?.variantsColor?.length ? data.variantsColor : [],
  typeProduct: data.typeProduct
    ?.map((el) =>
      Object.values(_.pick(el, ["id", "categoryId", "subCategoryId"]))
    )
    .flat(),
});



const CreateProductForm = () => {
  const { allTypeClothesWithParentIds } = useCategoriesHook();
  const { data } = useGetColors();
  const [addProduct] = useAddProductMutation();
  const { showSuccessSnackbar } = useSnackbars();

  const handleSubmit = async (formData: CreateProductDataType) => {
    const data: ProductInputType = {
      ...CreateProductDto(formData),
      // @ts-ignore
      imageFiles: formData.imageFiles,
    };
    

    addProduct({
      variables: {
        data,
      },
      onCompleted: () => {
        showSuccessSnackbar("You successfully added new product");
      },
      update(cache, { data }) {
        let cacheData: any = cache.readQuery({
          query: GetProductsDocument,
        });

        if (cacheData?.getProducts) {
          const mutationArray = [...cacheData.getProducts];
          mutationArray.push(data?.addProduct);

          cache.writeQuery({
            query: GetProductsDocument,
            data: { getProducts: mutationArray },
          });
        }
      },
    });
  };

  
  
  
  return (
    <Box h="fit-content">
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, values, form: { change, reset } }) => {
          return (
            <Box behavior="column" p="0 0 100px 0">
              <Box m="0 0 30px 0" behavior="rowAlignCenter">
                <Icon icon={faCirclePlus} />
                <Text m="0 0 0 15px" variant="medium">
                  Create a new product
                </Text>
              </Box>
              <InputWithLabel
                label="Name"
                name="name"
                placeholder="Enter name product"
                m="0 0 15px 0"
              />
              <InputWithLabel
                label="Description"
                name="description"
                placeholder="Enter description product"
                m="0 0 15px 0"
              />
              <InputWithLabel
                label="Product details"
                name="productDetail"
                placeholder="Enter details about product"
                m="0 0 15px 0"
              />
              <InputWithLabel
                label="Price"
                name="price"
                placeholder="Enter price"
                m="0 0 15px 0"
              />
              <InputFile
                name="imageFiles"
                onChange={(files) => change("imageFiles", files)}
              />
              <CheckboxWithLabel m="10px 0 0 0" label="Kid clothe" name="kid" />
              <Box behavior="rowAlignCenter">
                <CheckboxWithLabel
                  id="female"
                  label="WOMAN"
                  type="radio"
                  value="WOMAN"
                  name="gender"
                />
                <CheckboxWithLabel
                  m="0 0 0 15px"
                  id="male"
                  label="MAN"
                  type="radio"
                  value="MAN"
                  name="gender"
                />
              </Box>
              <MultiSelect
                placeholder="Select product type"
                items={allTypeClothesWithParentIds}
                name="typeProduct"
                multiselect
                onChange={change}
              />
              <MultiSelect
                placeholder="Select sizes"
                items={sizes}
                name="sizes"
                multiselect
                onChange={change}
              />
              <ColorPicker
                name="color"
                items={data?.getColors}
                onChange={change}
              />
              <CheckboxWithLabel
                m="10px 0 20px 0"
                label="Link product by color"
                name="linkProducts"
              />
              <Box w="200px" behavior="column">
                <AnimationPresenceBox
                  renderWhen={!!values.linkProducts}
                  variantAnimation="blockAnimation"
                >
                  <Text variant="small">
                    Here you can link products by color by selecting a product,
                    they will be linked by the same type of product but in a
                    different color. (they will also link to the already
                    existing types of the selected product, they will become
                    common)
                  </Text>
                  <ProductSearcher name="variantsColor" onChange={change} />
                </AnimationPresenceBox>
              </Box>
              <Button
                p="20px 20px"
                w="fit-content"
                onClick={() => {
                  handleSubmit()?.then((res) => reset());
                }}
              >
                Add a new product
              </Button>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default CreateProductForm;
