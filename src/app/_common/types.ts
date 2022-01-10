export interface Services {
  _id: string,
  title: string,
  description: string,
  image: string,
  price: string,
  about: string,
  currency: string,
  details: string,
  time: string
}

export interface Products {
  _id: string,
  currency: string,
  image: string,
  price: number,
  quantity_sold: number,
  status: string,
  rate: number,
  title: string,
  details: string,
  weight: string,
  type_id: string,
  type_name: string
}
