import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-2xl font-bold mb-4">Selecione um prompt</h1>
      <p className="text-gray-400">
        Escolha um prompt ao lado para visualizar ou editar
      </p>
    </main>
  );
}
