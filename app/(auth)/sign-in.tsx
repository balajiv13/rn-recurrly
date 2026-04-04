import { Link } from "expo-router";
import { Text, View } from "react-native";

const Signin = () => {
    return (
        <View>
            <Text>
                Sign In
            </Text>
            <Link href="./sign-up">Create Account</Link>
            <Link href="../index">Go Back</Link>
        </View>
    )
}

export default Signin;