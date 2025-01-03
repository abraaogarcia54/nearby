import { Text, View } from "react-native";
import { Step } from "../step";
import {s} from "./styles"
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";

export function Steps(){
    return(
        <View style={s.container}>
            <Text style={s.title}>Veja como funciona:</Text>

            <Step 
            icon={IconMapPin}
            title="Encontre o estabelecimento"
            description="Veja locais perto de voce que sao parceiros Nearby."/>

            <Step 
            icon={IconQrcode}
            title="Ative o cupom com QR Code"
            description="Escaneie o codigo no estabelecimento para usar o beneficio."/>

            <Step 
            icon={IconTicket}
            title="Garanta vantagens perto de voce"
            description="Ative cupons onde estiver, em diferentes tipos de estabelecimentos."/>

        </View>
    )
}