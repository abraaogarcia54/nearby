import { ImageBackground, View } from "react-native";
import {s} from "./styles"
import { IconArrowLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { Buttun } from "@/components/button";

type Props = {
    uri: string
}

export function Cover( {uri}:Props ){
    return(
        <ImageBackground source={{ uri }} style={s.container}>
            <View style={s.header}>
                <Buttun style={{ width: 40, height: 40}} onPress={() => router.back()}>
                    <Buttun.Icon icon={IconArrowLeft} />
                </Buttun>
            </View>
        </ImageBackground>
    )
}
