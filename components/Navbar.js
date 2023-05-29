import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiOutlineCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'

const Navbar = ({cart, addToCart, removeFromCart, clearCart, subTotal}) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
  const toogleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }

  const ref = useRef()
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10'>
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image src="/logo.webp" alt="This is a logo" width={200} height={40} priority />
        </Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-4 font-bold md:text-md'>
          <Link href={'/tshirts'}><li>Tshirts</li></Link>
          <Link href={'/hoodies'}><li>Hoodies</li></Link>
          <Link href={'/stickers'}><li>Stickers</li></Link>
          <Link href={'/mugs'}><li>Mugs</li></Link>
        </ul>
      </div>
      <div onClick={toogleCart} className="cart absolute right-0 top-4 mx-5">
        <AiOutlineShoppingCart className='text-xl md:text-2xl cursor-pointer' />
      </div>
      <div ref={ref} className={`w-72 h-[100vh] sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : ' translate-x-full'}`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={toogleCart} className="absolute top-2 right-2 cursor-pointer text-2xl text-pink-500"><AiOutlineCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && 
          
          <div className='my-3 font-semibold'>Your cart is Empty!</div>}
          {Object.keys(cart).map((k) => {return <li key={k}>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold'>{cart[k].name}</div>
              <div className='flex font-semibold justify-center items-center w-1/3 text-lg'><AiFillMinusCircle className='cursor-pointer text-pink-500' onClick={() => {removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} /><span className="mx-2 text-sm">{cart[k].qty}</span><AiFillPlusCircle className='cursor-pointer text-pink-500' onClick={() => {addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} /></div>
            </div>
          </li>})}

        </ol>
        <div className="font-bold my-3">Subtotal: रू{subTotal}</div>
        <div className="flex">
          <Link href={'/checkout'}><button className="flex mt-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm mr-2"><BsFillBagCheckFill className='m-1' /> Checkout</button></Link>
          <button onClick={clearCart} className="flex mt-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm mr-2">Clear</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
