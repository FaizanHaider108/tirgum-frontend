'use client'
import React, { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
// import { useRouter } from 'next/router'
import { ProductList } from "@/types";
import { ImageMagnifierType } from "@/types";
import Image from "next/image";

const Card: React.FC<{ params: { id: string } }> = ({ params }) => {

    const [product, setProduct] = useState<ProductList | null>(null)
    const [images, setImages] = useState<string[]>([]);


    const handleImageClick = (index: number) => {
        const clickedImage = images[index];
        const updatedImages = [
            clickedImage,
            ...images.slice(0, index),
            ...images.slice(index + 1)
        ];
        setImages(updatedImages);
    };

    const fetchProduct = async () => {
        const response = await fetch(
            `${process.env.API_URL}/api/tyreadderapp/products/${params?.id}/`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data && data)
        setImages(data?.image_urls)
    };


    function ImageMagnifier({
        src,
        width,
        height,
        magnifierHeight = 400,
        magnifieWidth = 400,
        zoomLevel = 1.7
    }: ImageMagnifierType) {
        const [[x, y], setXY] = useState([0, 0]);
        const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
        const [showMagnifier, setShowMagnifier] = useState(false);
        return (
            <div
                style={{
                    position: "relative",
                    height: height,
                    width: width
                }}
            >
                <img
                    src={src}
                    style={{ height: height, width: width, objectFit: "cover" }}
                    onMouseEnter={(e) => {
                        // update image size and turn-on magnifier
                        const elem = e.currentTarget;
                        const { width, height } = elem.getBoundingClientRect();
                        setSize([width, height]);
                        setShowMagnifier(true);
                    }}
                    onMouseMove={(e) => {
                        // update cursor position
                        const elem = e.currentTarget;
                        const { top, left } = elem.getBoundingClientRect();

                        // calculate cursor position on the image
                        const x = e.pageX - left - window.pageXOffset;
                        const y = e.pageY - top - window.pageYOffset;
                        setXY([x, y]);
                    }}
                    onMouseLeave={() => {
                        // close magnifier
                        setShowMagnifier(false);
                    }}
                    alt={"img"}
                />

                <div
                    style={{
                        display: showMagnifier ? "" : "none",
                        position: "absolute",

                        // prevent magnifier blocks the mousemove event of img
                        pointerEvents: "none",
                        // set size of magnifier
                        height: `${magnifierHeight}px`,
                        width: `${magnifieWidth}px`,
                        // move element center to cursor pos
                        top: `${y - magnifierHeight / 2}px`,
                        left: `${x - magnifieWidth / 2}px`,
                        opacity: "1", // reduce opacity so you can verify position
                        border: "2px solid lightgray",
                        borderRadius: "9999999px",
                        backgroundColor: "white",
                        backgroundImage: `url('${src}')`,
                        backgroundRepeat: "no-repeat",

                        //calculate zoomed image size
                        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                            }px`,

                        //calculate position of zoomed image.
                        backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                        backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                    }}
                ></div>
            </div>
        );
    }


    useEffect(() => {
        fetchProduct();
    }, [params?.id])

    return (
        <div className="container grid grid-cols-1 sm:grid-cols-2 gap-6 mt-40 mx-auto px-8 sm:px-0">

            <div>
                <ImageMagnifier
                    src={images && images[0]}
                    width={"100%"}
                    height={"35rem"}
                    magnifierHeight={400}
                    magnifieWidth={400}
                    zoomLevel={1.7}
                />
                {images &&
                    <div className={`grid grid-cols-3 gap-2 my-2`}>
                        {/* Render smaller images dynamically */}
                        {images?.slice(1).map((image, index) => (
                            <Image
                            key={index}
                            width={100}
                            height={100}
                            loader={() => image} 
                            unoptimized={true}
                            src={image}
                            onClick={() => handleImageClick(index)}
                            className="w-full aspect-square object-cover cursor-pointer border border-primary"
                            alt={`${product?.brand_name} ${product?.tread_name} ${product?.size_text}`}
                            />
                        ))}
                    </div>
                }


            </div>

            <div className="space-y-2">
                <h2 className="text-4xl font-bold uppercase mb-2">
                    {product?.brand_name}
                    <br />
                    <small className="text-slate-400">{product?.tread_name}</small>
                    <br />
                    {product?.size_text}
                </h2>
                <div className="border-b border-gray-200">
                    <p className="text-gray-400 font-semibold space-x-2">
                        <span className="text-gray-800">Id:</span>
                        <span className="text-gray-600">{product?.id}</span>
                    </p>
                    <p className="text-gray-400 font-semibold space-x-2">
                        <span className="text-gray-800">Marka:</span>
                        <span className="text-gray-600">{product?.brand_name ? product.brand_name : "------"}</span>
                    </p>
                    <p className="text-gray-400 font-semibold space-x-2">
                        <span className="text-gray-800">Bieżnik:</span>
                        <span className="text-gray-600">{product?.tread_name ? product.tread_name : "------"}</span>
                    </p>
                    <p className="text-gray-400 font-semibold space-x-2">
                        <span className="text-gray-800">Rozmiar:</span>
                        <span className="text-gray-600">{product?.size_text ? product.size_text : "------"}</span>
                    </p>
                    <p className="text-gray-400 font-semibold space-x-2">
                        <span className="text-gray-800">Głębokość bieżnika:</span>
                        <span className="text-gray-600">{product?.tread_depth_min} - {product?.tread_depth_max}</span>
                    </p>
                    <p className="text-gray-400 font-semibold space-x-2">
                        <span className="text-gray-800">Dot:</span>
                        <span className="text-gray-600">{product?.dot ? product.dot : "--"}</span>
                    </p>
                </div>

                <div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_tire_bead_damaged === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Uszkodzona stopka</p>
                            </>
                        )}

                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_incised === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Nacinana</p>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.front_repairs !== 0) && (
                            <>
                                <FaCircleCheck />
                                <p>Naprawa gwoździowa</p>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_side_repair === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Naprawa boczna</p>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_visible_cracks === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Widoczne pęknięcia</p>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_braked === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Hamulec</p>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_braked_repair === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Naprawa po hamulcu</p>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_cosmetology === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Kosmetyka</p>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_retreaded === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Bieżnikowana</p>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_ruts === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Koleiny</p>
                            </>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {(product?.is_circumventional_cut === true) && (
                            <>
                                <FaCircleCheck />
                                <p>Dodatkowy rowek</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                    <p className="text-5xl text-red-600 text-primary font-semibold">
                        {product?.net_price ? `${product?.net_price} zł` : "NOT AVAILABLE"}
                    </p>
                    <p className="text-base text-gray-400 line-through">550 zł</p>
                </div>
                <div>
                    Cena nowej opony:
                    <span className="font-bold text-green-600">1200 zł</span>{" "}
                </div>

                {/* button */}
                <div className="gap-3 border-b border-gray-200 pb-5 mt-6">
                    <Link
                        href="#"
                        className="bg-red-500 border border-primary text-white px-8 py-2 rounded-md uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition hover:border-black hover:text-black"
                    >
                        <FaCartShopping />
                        Kup
                    </Link>
                </div>
                {/* social share */}
                <div className="flex gap-3 mt-4 items-center">
                    <a
                        href="#"
                        className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                        <FaFacebook size={45} className="text-blue-800" />
                    </a>
                    <span className="text-gray-500">Udostępnij ofertę na facebooku</span>
                </div>
            </div>


            {/* Description */}

            <div className="container pb-16">
                <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
                    Opis produktu
                </h3>
                <div className="w-full pt-6">
                    <div className="space-y-4">
                        <p>{product?.advert_description ? product.advert_description : 'No description available'}</p>
                    </div>
                </div>
            </div>
            <div className="container pb-16">
                <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
                    Porównaj z nową oponą
                </h3>
                {/* tabela */}
                <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
                    <tbody>
                        <tr>
                            <th className="py-2 px-4 border border-gray-500 w-40 font-medium">
                                <p>
                                    Cena netto:{" "}
                                    <span className="text-black text-bold"> 415 zł</span>
                                </p>
                            </th>
                            <th className="py-2 px-4 border border-gray-500">
                                <p>
                                    Cena nowej opony netto:
                                    <span className="text-black text-bold"> 1400 zł</span>
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th className="py-2 px-4 border border-gray-500 w-40 font-medium">
                                Głębokość bieżnika
                            </th>
                            <th className="py-2 px-4 border border-gray-500">
                                Głębokość bieżnika nowej opony
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div className="space-y-4">
                    <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium mt-4">
                        Ogólne zasady
                    </h3>
                    <p>
                        Każda z naszych opon jest dokładnie sprawdzana ciśnieniowo oraz
                        wizualnie. Inspekcja jednej opony trwa ok 3 minuty i 30 sek.
                    </p>
                    <p>
                        Wszelkie naprawy wykonywane są zgodnie ze sztuką wulkanizacyjną z
                        zastosowaniem odpowiednich standardów oraz chemii naprawczej.
                    </p>
                    <p>Każda z naszych opon jest oznaczona etykietą.</p>
                    <p>
                        Wysyłamy opony na paletach. Możesz je również odebrać osobiście.
                        Sprawdź również naszą ofertę montażu na miejscu i mobilnie.
                    </p>
                    <p>
                        Kurierzy często się spóźniają. My dowozimy nasze opony do centrum
                        przeładunkowego, dzięi czemu opóźnienia w dostawie zdarzają się
                        niezwykle rzadko.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Card;
