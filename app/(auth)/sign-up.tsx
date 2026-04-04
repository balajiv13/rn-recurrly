import { Link } from "expo-router";
import { Text, View } from "react-native";

const Signup = () => {
    return (
        <View>
            <Text>
                Sign Up
            </Text>
            <Link href="./sign-in">Already have an account? Sign In</Link>
        </View>
    )
}

export default Signup;