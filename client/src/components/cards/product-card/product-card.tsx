import React from "react";
import { Text } from "src/UI-kit";
import { IProduct, IProductCart } from "src/types";
import { IconWrapper, Image, InfoBlock, ProductWrapper } from "./styled";
import { Icon } from "../../icons/icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

interface IProductCardProps {
  productItem: IProductCart;
  onClick: (id: string) => void;
}

export const ProductCard = ({ productItem, onClick }: IProductCardProps) => {
  return (
    <ProductWrapper onClick={() => onClick(productItem.id)}>
      <Image src={productItem.images[0].location} />
      <InfoBlock>
        <Text variant="small">{productItem.name}</Text>
        <Text m="10px 0 0 0" variant="small">
          {productItem.price}
        </Text>
      </InfoBlock>
      <IconWrapper>
        <Icon cursor="pointer" s="20px" icon={faHeartRegular} />
      </IconWrapper>
    </ProductWrapper>
  );
};
