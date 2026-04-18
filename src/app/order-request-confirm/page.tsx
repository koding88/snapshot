import { redirect } from 'next/navigation';

export default function OrderRequestConfirmRedirect({ searchParams }: { searchParams: { [key: string]: string } }) {
  // Locale mặc định, có thể thay đổi thành 'vi' hoặc 'zh' nếu muốn
  const locale = 'en';
  const token = searchParams.token ? `?token=${searchParams.token}` : '';
  redirect(`/${locale}/order-request-confirm${token}`);
}
