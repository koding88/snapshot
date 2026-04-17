# Shared types dùng chung cho public APIs

Folder này chứa các file dùng chung mà nhiều module public cùng phụ thuộc.

## 1. Pagination

File gốc backend:
- `src/core/application/common/pagination.interface.ts`
- `src/common/constants/query.constants.ts`

Bản copy:
- [pagination.interface.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/shared/source-types/pagination.interface.ts)
- [query.constants.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/shared/source-types/query.constants.ts)

Ý nghĩa cho FE:
- list endpoint paginated trả `items + meta`
- nếu FE không truyền `page` / `limit`, runtime sẽ dùng default hiện tại là `1` và `10`

## 2. LocalizedText

File gốc backend:
- `src/common/interfaces/localized-text.interface.ts`

Bản copy:
- [localized-text.interface.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/shared/source-types/localized-text.interface.ts)

Code:

```ts
export interface LocalizedText {
  en: string;
  vi: string;
  cn: string;
}
```

Ý nghĩa cho FE:
- đây là object multilingual dùng ở admin/internal output và một số nested snapshot type
- nhưng không phải public endpoint nào cũng trả raw `LocalizedText`
- cần nhìn đúng từng module:
  - galleries public trả `name: string`
  - projects public list/detail trả `name: string`
  - packages public trả `name: string`, `bestFor: string`
  - orders public confirm trả nested snapshot có `LocalizedText`

## 3. Về `EditorJsOutputData`

`EditorJsOutputData` **không phải** shared type ở `common`.
Nó đang được định nghĩa theo module:
- `src/modules/projects/projects.types.ts`
- `src/modules/blogs/blogs.types.ts`

Hiện tại 2 file này có cùng shape runtime. Bản copy nằm trong:
- [projects source-types](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types)
- [blogs source-types](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types)

FE cần hiểu practical:
- đây là whole Editor.js document
- field quan trọng là `blocks`
- backend không ép FE render theo HTML string; FE cần render/transform theo schema dữ liệu Editor.js

