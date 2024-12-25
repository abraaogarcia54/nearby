import { Text, TouchableOpacity, TouchableOpacityProps, TextProps, ActivityIndicator } from "react-native";
import { colors } from "@/styles/theme";
import {s} from "./styles"
import { IconProps  as TablerIconsProps } from "@tabler/icons-react-native"

type ButtonProps = TouchableOpacityProps & {
    isLoading? : boolean
}

function Buttun({children, style, isLoading = false, ...rest}: ButtonProps){
    return <TouchableOpacity style={[s.container, style]} 
    activeOpacity={0.8} 
    disabled={isLoading}
    {...rest}
    >

        {isLoading ? (
            <ActivityIndicator size="small" color={colors.gray[100]}/> 
            ):(
                children
            )}
    </TouchableOpacity>
}

function Title({children}: TextProps){
    return <Text style={s.title}>
        {children}
    </Text>
}

type IconProps = {
    icon: React.ComponentType<TablerIconsProps>
}

function Icon({ icon: Icon }: IconProps){
    return <Icon size={24} color={colors.gray[100]}/>
}

Buttun.Title = Title
Buttun.Icon = Icon

export {Buttun}