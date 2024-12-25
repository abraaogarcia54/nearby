import { Alert, View, Modal, StatusBar, ScrollView } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router"
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Buttun } from "@/components/button";
import { useCameraPermissions, CameraView } from "expo-camera"


type DataProps = PropsDetails & {
    cover: string
}

export default function Market(){

    const [ isVisibleCameraModal, setIsVisibleCameraModal ] = useState(false)
    const [ coupon, setCoupon ] = useState< string | null >(null)
    const [ data, setData ] = useState<DataProps>()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ permission, requestPermission ] = useCameraPermissions() 
    const [ couponIsFetching, setCouponIsFetching ] = useState(false)

    const params = useLocalSearchParams<{ id: string }>()
    const qrCode = useRef(false)
    console.log(params.id)

    async function fecthMarket(){
        try {
          
          const { data } = await api.get(`/markets/${params.id}`)
          setData (data)
          setIsLoading(false)
        } catch (error) {
          Alert.alert("Erro", "Nao foi possivel carregar os dados" ,[
            { text: "OK", onPress: ()=> router.back},
          ])  
        }
    }

    async function handleOpenCamera(){
        try {

          const { granted } = await requestPermission()  

          if(!granted){
            return Alert.alert("Camera", "Voce precisa habilitar o uso da camera.")
          }

          qrCode.current = false
          setIsVisibleCameraModal(true)  

        } catch (error) {
          console.log(error)  
          Alert.alert("Camera", "Nao foi possivel utilizar a camera")
        }
    }

    async function getCoupon(id: string){
        try {
          setCouponIsFetching(true)  

          const { data } = await api.patch("/coupons/" + id )
          Alert.alert("Cupon", data.coupon)
          setCoupon(data.coupon)

        } catch (error) {
          console.log(error)  
          Alert.alert("Erro", "Nao foi possivel utilizar o cupom")  
        } finally {
          setCouponIsFetching(false)   
        }
    }

    function handleUseCoupon( id: string ){
        setIsVisibleCameraModal(false)

        Alert.alert("Cupon", 
            "Nao é possivel reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
        [
            { style: "cancel", text: "Nao"},
            { text: "Sim", onPress: () => getCoupon(id)}
        ])
    }

    useEffect(() =>{
        fecthMarket()
    }, [params.id, coupon])

    if( isLoading ){
        return <Loading/>
    }

    if(!data){
        return <Redirect href="/home"/>
    }

    return(
        <View style={{ flex:1 }}>
            <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={data?.cover}/>
                <Details data={data}/>
                { coupon && <Coupon code={coupon}/>}
            </ScrollView>

            <View style={{ padding:32 }}>
                <Buttun onPress={handleOpenCamera}>
                    <Buttun.Title>Ler QR</Buttun.Title>
                </Buttun>
            </View>

            <Modal style={{flex:1}} visible={isVisibleCameraModal}>

                <CameraView
                style={{flex:1}}
                facing="back"
                onBarcodeScanned={({ data }) => {
                    if(data && !qrCode.current){
                        qrCode.current = true
                        setTimeout(() => handleUseCoupon(data), 500 )
                    }
                }}
                />

                <View style={{position:"absolute", bottom:32, left:32, right:32}}>
                    <Buttun onPress={() => setIsVisibleCameraModal(false)} isLoading={couponIsFetching}>
                        <Buttun.Title>Voltar</Buttun.Title>
                    </Buttun>
                </View>
            </Modal>
        </View>
    )
}