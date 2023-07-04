'use client'
import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { getFilterProducts, clearState } from "@/redux/Slice"
import { debounce } from 'lodash';

export default function FilterBar({ products, gender, category, name }) {

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(clearState())
        }
    }, [])

    const [price, setPrice] = useState(0)
    const [genders, setGenders] = useState("")
    const [names, setNames] = useState("")
    const [categorys, setCategorys] = useState("")
    const [filterBrands, setFilterBrands] = useState([])
    const [filterColors, setFilterColors] = useState([])
    

    useEffect(()=>{
        console.log({RANGODEPRECIO:price})
    },[price])

    const [filterBar, setFilterBar] = useState({
        brand: "",
        color: ""
    })

    console.log({ FILTRADOPRINCIPAL: genders + " " + categorys })

    useEffect(() => { setGenders(gender) }, [gender])
    useEffect(() => { setCategorys(category) }, [category])
    useEffect(() => { setNames(name) }, [name])

    useEffect(() => {
        if (genders && genders.length > 0 && categorys && categorys.length > 0) {
            dispatch(getFilterProducts(gender, category))
        }
    }, [genders, categorys])

    const handleRange = (event) => {
        setPrice(event.target.value)
    }

    const getBrands = () => {
        const arrayBrands = products?.flatMap((el) => el.brand[0])
        const brands = new Set(arrayBrands)
        const newArray = Array.from(brands)
        setFilterBrands(newArray)
    }


    const getColors = () => {
        const arrayColors = products?.flatMap((el) => el.color ? el.color[0] : '')
        const colors = new Set(arrayColors)
        const newArray = Array.from(colors)
        setFilterColors(newArray)
    }

    const handleBrandChange = (event) => {
        const { value, checked } = event.target
        console.log(value);
        console.log(checked);
        if (checked) {
            if (filterBar.brand == "") {
                let valor = filterBar.brand + value + ","
                setFilterBar({ ...filterBar, brand: valor })
            }
            else {
                let valor = filterBar.brand + value + ","
                setFilterBar({ ...filterBar, brand: valor })
            }
        } else {
            let newBrands = filterBar.brand.replace(new RegExp(value + ",?"), "");
            setFilterBar({ ...filterBar, brand: newBrands })
        }
    }

    const handleColorChange = (event) => {
        const { value, checked } = event.target;
        console.log(value);
        console.log(checked);
        if (checked) {
            if (filterBar.color == "") {
                let valor = filterBar.color + value + ","
                setFilterBar({ ...filterBar, color: valor })
            }
            else {
                let valor = filterBar.color + value + ","
                setFilterBar({ ...filterBar, color: valor })
            }
        } else {
            let newColors = filterBar.color.replace(new RegExp(value + ",?"), "");
            setFilterBar({ ...filterBar, color: newColors })
        }
    }

    useEffect(() => {
        getBrands()
        getColors()
    }, [products, filterBar])

    useEffect(() => {
        if ((filterBrands !== ',' && filterBrands.length > 0) || (filterColors !== ',' && filterColors.length > 0)||(price&&price>0)) handleSubmit()
    }, [filterBar, price])

    console.log(products);
    console.log(filterBrands);

    console.log(filterBar);

    const debouncedSubmit = useCallback(
        debounce(() => {
            if (
                (filterBar.brand && filterBar.brand.length > 1) ||
                (filterBar.color && filterBar.color.length > 1) ||
                (names && names.length > 0)||
                (price && price>0)
            ) {
                let brand = filterBar.brand;
                let color = filterBar.color;
                dispatch(
                    getFilterProducts(
                        genders,
                        categorys,
                        brand !== ',' ? brand : null,
                        color !== ',' ? color : null,
                        names,
                        price > 0 ? price : null,
                    )
                );
            } else {
                dispatch(getFilterProducts(genders, categorys, names, ));
            }
        }, 500),
        [filterBar, names, price, dispatch]
    );
//comentario
    const handleSubmit = () => {
        debouncedSubmit();
    };

    useEffect(() => {
        return () => {
            // Cancelar el debounce cuando se desmonte el componente
            debouncedSubmit.cancel();
        };
    }, [debouncedSubmit]);


    return (
        <div className="w-[20%]">


            <article className="w-[100%]  p-[0.6rem] flex flex-col gap-y-[1rem]">
                <h3 className="border-[#A9A9B2] border-b-[1px]">Brand</h3>
                <input
                    className="w-[100%] text-[0.8rem] p-[0.4rem] border-[#A9A9B2] border-[1px]"
                    type="text" placeholder="Search for brand" />

                <div
                    className="flex flex-col h-[120px] overflow-y-scroll">
                    {
                        filterBrands?.map((brand, index) => {
                            return (
                                <label key={index} htmlFor="">
                                    <input
                                        value={brand}
                                        onChange={handleBrandChange}
                                        type="checkbox" /> <span className="text-[#A9A9B2]">{brand}</span>
                                </label>
                            )
                        })
                    }
                </div>


            </article>

            <article className="w-[100%] p-[0.6rem] flex flex-col gap-y-[1rem]">
                <h3 className="border-[#A9A9B2] border-b-[1px]">Color</h3>
                <input
                    className="w-[100%] text-[0.8rem] p-[0.4rem] border-[#A9A9B2] border-[1px]"
                    type="text" placeholder="Search for color" />

                <div
                    className="flex flex-col h-[120px] overflow-y-scroll">
                    {
                        filterColors?.map((filter, index) => {
                            return (
                                <label key={index} htmlFor="">
                                    <input type="checkbox" value={filter} onChange={handleColorChange} /> <span className="text-[#A9A9B2]">{filter}</span>
                                </label>
                            )
                        })
                    }
                </div>

            </article>

            <article className="w-[100%] p-[0.6rem] flex flex-col gap-y-[1rem]">
                <h3 className="border-[#A9A9B2] border-b-[1px]">Price</h3>
                <input value={price} onChange={handleRange} type="range" min={0} max={200000} />
                <span>{price}</span>

            </article>

        </div>
    )
}