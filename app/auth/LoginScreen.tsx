import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import API_URL from "../../config/config";

export default function LoginScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleLogin = async () => {
		try {
			const response = await axios.post(`${API_URL}/api/auth/login`, {
				username,
				password,
			});
			const { token } = response.data.data;
			await AsyncStorage.setItem("token", token);
			router.replace("/(tabs)"); // Prevent back navigation to login
		} catch (error) {
			const errorMessage = (error as any).response?.data?.message || "An error occurred";
			Alert.alert("Login Failed", errorMessage);
		}
	};

	return (
		<ThemedView style={styles.container}>
			<Image
				source={require("../../assets/images/favicon2.jpg")}
				style={styles.logo}
			/>
			<Text style={styles.title}>Welcome Back!</Text>
			<Text style={styles.subtitle}>Log in to continue</Text>
			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
				placeholderTextColor="#B0B0B0" // Light gray for placeholder
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				placeholderTextColor="#B0B0B0" // Light gray for placeholder
			/>
			<TouchableOpacity
				style={styles.loginButton}
				onPress={handleLogin}
			>
				<Text style={styles.loginButtonText}>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.registerButton}
				onPress={() => router.push("/auth/RegisterScreen")}
			>
				<Text style={styles.registerButtonText}>Register</Text>
			</TouchableOpacity>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#003366", // Dark blue background
	},
	logo: {
		width: 150,
		height: 150,
		marginBottom: 24,
		resizeMode: "contain",
	},
	title: {
		fontSize: 32, // Larger font size for luxury feel
		fontWeight: "bold",
		marginBottom: 8,
		color: "#FFD700", // Gold color for title
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		marginBottom: 24,
		color: "#E0E0E0", // Light gray for subtitle
		textAlign: "center",
	},
	input: {
		width: "100%",
		height: 48,
		borderColor: "#FFD700", // Gold border
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 16,
		backgroundColor: "#00509E", // Darker blue for input
		fontSize: 16,
		color: "#FFFFFF", // White text for input
	},
	registerButton: {
		width: "100%",
		height: 48,
		borderWidth: 1,
		borderColor: "#FFD700", // Gold border
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00509E", // Darker blue for button
		marginBottom: 16,
	},
	registerButtonText: {
		color: "#FFD700", // Gold text for button
		fontSize: 16,
		fontWeight: "600",
	},
	loginButton: {
		width: "100%",
		height: 48,
		borderWidth: 1,
		borderColor: "#FFD700", // Gold border
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFD700", // Gold button
		marginBottom: 24, // Increased margin for more space below
	},
	loginButtonText: {
		color: "#003366", // Dark blue text for button
		fontSize: 16,
		fontWeight: "600",
	},
});
