import ProductSlideshow from "../home"

export default function Home() {
  return (
    <main>

      <h1 className="font-sans text-[2.8rem] font-bold text-center leading-snug text-gray-900 mt-[60px] mb-[40px]">

        Welcome to 
        <i className="text-blue-700"> ShopNow </i>

        <br />

        <span className="font-normal text-[1.5rem] text-gray-500">
          Discover Your Next Favorite Thing
        </span>

      </h1>

      <ProductSlideshow />

    </main>
  )
}