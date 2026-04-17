# Public API - Orders

## APIs trong module này

1. `POST /api/v1/orders/public/request`
2. `POST /api/v1/orders/public/confirm`

Module này cần đọc kỹ hơn các module khác vì semantics business của flow public orders khá đặc biệt.

## 1. Public - Request Order Confirmation

- **Method**: `POST`
- **URL**: `/api/v1/orders/public/request`
- **Mục đích**: tạo Redis draft và gửi email confirm cho user
- **Auth**: không cần auth
- **Response message**: `Order request submitted successfully`

## Điều rất quan trọng

Endpoint này **chưa tạo order thật**.

Nó chỉ làm:

- validate payload
- validate references (gallery/package) ở bước draft-submit
- tạo Redis draft
- generate token
- gửi email confirm

### Request DTO

File gốc backend:

- `src/modules/orders/presentation/http/dto/submit-order-request.request.ts`

Bản copy:

- [submit-order-request.request.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/submit-order-request.request.ts)

### Input DTO

File gốc backend:

- `src/modules/orders/application/dto/submit-order-request.input.ts`

Bản copy:

- [submit-order-request.input.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/submit-order-request.input.ts)

### Related types

File gốc backend:

- `src/modules/orders/orders.types.ts`

Bản copy:

- [orders.types.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/orders.types.ts)

Code load-bearing:

```ts
export type OrderMoney = {
  amount: number;
  currency: string;
};

export type OrderCustomerInfo = {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber?: string | null;
};
```

### Package mode FE phải gửi gì

FE gửi:

```json
{
  "name": "Nguyen Van A",
  "email": "customer@example.com",
  "phoneNumber": "+84901234567",
  "countryCode": "VN",
  "galleryId": "gallery-id",
  "packageId": "package-id",
  "discoverySource": "facebook",
  "personalStory": "We want to capture our Hanoi anniversary story."
}
```

FE không được gửi:

- `budget`
- `pricing`
- `requestDraftId`

### Custom mode FE phải gửi gì

FE gửi:

```json
{
  "name": "Tran Thi B",
  "email": "custom@example.com",
  "phoneNumber": "+14155552671",
  "countryCode": "VN",
  "galleryId": "gallery-id",
  "budget": {
    "amount": 2500000,
    "currency": "VND"
  },
  "discoverySource": "instagram",
  "personalStory": "We want a tailor-made anniversary session in Hanoi."
}
```

FE không được gửi:

- `packageId`
- `pricing`
- `requestDraftId`

### Runtime response

File gốc backend:

- `src/modules/orders/application/use-cases/submit-order-request.use-case.ts`

Bản copy:

- [submit-order-request.use-case.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/submit-order-request.use-case.ts)

Runtime trả:

```ts
Promise<{ requested: true }>;
```

### Lưu ý tích hợp FE

- `requestDraftId` là **backend-generated internal identifier**.
- FE **không** truyền `requestDraftId`.
- FE **không** gửi `pricing`.
- FE **bắt buộc** gửi `phoneNumber` ở `public/request`.
- Package mode dùng `packageId`.
- Custom mode dùng `budget`.
- Backend sẽ reject nếu:
  - custom mà không có `budget`
  - package mode nhưng lại gửi `budget`
  - `phoneNumber` không hợp lệ

---

## 2. Public - Confirm Order Request

- **Method**: `POST`
- **URL**: `/api/v1/orders/public/confirm`
- **Mục đích**: xác nhận draft và tạo order thật đúng 1 lần
- **Auth**: không cần auth
- **Response message**: `Order request confirmed successfully`

## Semantics business quan trọng

### First confirm

Lần confirm đầu tiên sẽ:

- verify token
- load draft
- create/reuse user
- rebuild snapshot
- create order thật

### Repeated confirm

Repeated confirm cùng token trong consumed-state TTL:

- **không tạo order mới**
- trả lại order cũ / success state cũ theo runtime hiện tại

Đây là behavior idempotent hiện tại.

FE không được hiểu nhầm repeated confirm là duplicate create.

### Request DTO

File gốc backend:

- `src/modules/orders/presentation/http/dto/confirm-order-request.request.ts`

Bản copy:

- [confirm-order-request.request.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/confirm-order-request.request.ts)

Code:

```ts
export class ConfirmOrderRequest {
  @IsString()
  @IsNotEmpty()
  token!: string;
}
```

### Input DTO

File gốc backend:

- `src/modules/orders/application/dto/confirm-order-request.input.ts`

Bản copy:

- [confirm-order-request.input.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/confirm-order-request.input.ts)

### Response DTO

File gốc backend:

- `src/modules/orders/presentation/http/dto/order.response.ts`

Bản copy:

- [order.response.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/order.response.ts)

Code load-bearing:

```ts
export class OrderResponse {
  id!: string;
  requestDraftId!: string | null;
  orderNumber!: string;
  userId!: string | null;
  customerInfo!: OrderCustomerInfoResponse;
  status!: OrderStatus;
  paymentStatus!: OrderPaymentStatus;
  discoverySource!: OrderDiscoverySource;
  personalStory!: string;
  items!: OrderItemResponse[];
  createdAt!: Date;
  updatedAt!: Date;
}
```

### Related types / files

File gốc backend:

- `src/modules/orders/application/dto/order.output.ts`
- `src/modules/orders/orders.types.ts`
- `src/modules/orders/application/use-cases/confirm-order-request.use-case.ts`
- `src/modules/orders/presentation/http/order.presenter.ts`
- `src/modules/orders/presentation/http/order.controller.ts`

Bản copy:

- [order.output.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/order.output.ts)
- [orders.types.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/orders.types.ts)
- [confirm-order-request.use-case.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/confirm-order-request.use-case.ts)
- [order.presenter.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/order.presenter.ts)
- [order.controller.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/source-types/order.controller.ts)

### Giải thích response item cho FE

`items` hiện tại là array `OrderItemResponse`.

Code liên quan:

```ts
export class OrderItemResponse {
  type!: 'package' | 'custom';
  galleryId!: string;
  gallerySnapshot!: OrderGallerySnapshotResponse;
  packageId!: string | null;
  packageSnapshot!: OrderPackageSnapshotResponse | null;
  pricing!: OrderMoneyResponse | null;
  budget!: OrderMoneyResponse | null;
  createdAt!: Date;
  updatedAt!: Date;
}
```

### Semantics rất quan trọng cho FE

#### `requestDraftId`

- Có mặt trong response order
- Nhưng đây là **internal identifier do backend sinh**
- FE **không gửi** field này ở request

#### Package item

Response package item có cả:

- `item.pricing`
- `item.packageSnapshot.pricing`

FE/UI canonical field nên dùng:

- **`item.pricing`**

`item.packageSnapshot.pricing` chỉ là snapshot data đầy đủ.

#### Custom item

FE/UI canonical field nên dùng:

- **`item.budget`**

#### Localized snapshot

Trong order response, các snapshot như:

- `gallerySnapshot.name`
- `packageSnapshot.name`
- `packageSnapshot.bestFor`

vẫn đang là `LocalizedText`, không phải localized string.

Lý do:

- order lưu historical snapshot raw để admin/public consumer có đủ context lúc order được tạo

### Lưu ý tích hợp FE

- FE chỉ cần gửi `{ token }` cho confirm.
- Confirm success đầu tiên sẽ tạo order.
- Repeated confirm không tạo order mới.
- Backend có success email async sau first successful create, nhưng repeated confirm không gửi lại email đó.
- `order.customerInfo.phoneNumber` là snapshot normalized E.164 từ request submit.
