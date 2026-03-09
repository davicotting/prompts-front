import { MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export function Logo() {
  return (
    <Link
      href={'/'}
      className="flex items-center gap-2 hover:text-accent-600 rounded-lg transition-colors"
    >
      <MessageSquare />
      <span className="font-semibold text-lg">PROMPS</span>
    </Link>
  );
}
