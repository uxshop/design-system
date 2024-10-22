export interface AddressInterface {
  id?: number | null;
  customer_id?: number | null;
  name?: string;
  receiver?: string;
  street?: string;
  zipcode?: string | number;
  number?: string | number;
  district?: string;
  state?: string;
  city?: string;
  detail?: string | null;
  readonly city_ibge_id?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface GmapsProps {
  address: AddressInterface;
  linkOnly?: boolean;
  style?: string;
  width?: string | number;
  height?: string | number;
  zoom?: string | number;
}
