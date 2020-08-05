import { OrderDetail } from './orderDetail';

export interface OrderRequest {
    client: string,
    details: OrderDetail[]
}
