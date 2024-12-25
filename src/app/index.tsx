import {View} from "react-native"
import { router, Router } from "expo-router"
import { Welcome } from "@/components/welcome"
import { Steps } from "@/components/steps"
import { Buttun } from "@/components/button"
import Home from "./home"

export default function Index (){
    return(
        <View style={{
            flex:1,
            padding:40,
            gap:40,
        }}>
            <Welcome/>
            <Steps/>

            <Buttun onPress={() => router.navigate("/home")}>
                <Buttun.Title>Começar</Buttun.Title>
            </Buttun>
        </View>
    )
}