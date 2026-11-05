/** Faixa com as 4 cores da marca — usada sob o menu e sobre o rodapé. */
export function FaixaMarca() {
  return (
    <div aria-hidden className="flex h-1.5">
      <div className="flex-1 bg-green-600" />
      <div className="flex-1 bg-yellow-500" />
      <div className="flex-1 bg-blue-500" />
      <div className="flex-1 bg-red-500" />
    </div>
  )
}
