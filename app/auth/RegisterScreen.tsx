import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/config";
import { LinearGradient } from 'expo-linear-gradient'; 

export default function RegisterScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const router = useRouter();

	const handleRegister = async () => {
		try {
			await axios.post(`${API_URL}/api/auth/register`, {
				username,
				password,
				email,
			});
			Alert.alert("Registration Successful", "You can now log in");
			router.replace("/auth/LoginScreen");
		} catch (error) {
			Alert.alert("Registration Failed", (error as any).response?.data?.message || "An error occurred");
		}
	};

	return (
		<LinearGradient colors={['#003366', '#006699']} style={styles.container}> {/* Dark to light blue gradient */}
			<View style={styles.header}>
				<Image
					source={require("../../assets/images/favicon2.jpg")}
					style={styles.image}
				/>
				<Text style={styles.title}>Create an Account</Text>
				<Text style={styles.subtitle}>Join us and get started</Text>
			</View>

			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
				placeholderTextColor="#B0B0B0" 
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
				placeholderTextColor="#B0B0B0" 
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				placeholderTextColor="#B0B0B0" 
			/>

			<TouchableOpacity
				style={styles.registerButton}
				onPress={handleRegister}
			>
				<Text style={styles.registerButtonText}>Register</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => router.replace("/auth/LoginScreen")}
			>
				<Text style={styles.backButtonText}>Back to Login</Text>
			</TouchableOpacity>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	header: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 32,
		paddingTop: 50,
	},
	image: {
		width: 120,
		height: 120,
		marginBottom: 16,
	},
	title: {
		fontSize: 32, 
		fontWeight: "bold",
		color: "#FFD700", 
	},
	subtitle: {
		fontSize: 18,
		color: "#B0B0B0", 
	},
	input: {
		width: "100%",
		height: 50,
		borderColor: "#FFD700", 
		borderWidth: 1,
		borderRadius: 25, 
		paddingHorizontal: 16,
		marginBottom: 16,
		backgroundColor: "#003366", 
		fontSize: 16,
		color: "#FFFFFF", 
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	registerButton: {
		width: "100%",
		height: 50,
		backgroundColor: "#006699", 
		borderRadius: 25, 
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
		shadowColor: "#222",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	registerButtonText: {
		color: "#FFD700", 
		fontSize: 18,
		fontWeight: "bold",
	},
	backButton: {
		width: "100%",
		height: 50,
		borderColor: "#FFD700",
		backgroundColor: "#003366", 
		borderWidth: 1,
		borderRadius: 25, 
		justifyContent: "center",
		alignItems: "center",
	},
	backButtonText: {
		color: "#FFD700", 
		fontSize: 16,
		fontWeight: "bold",
	},
});
