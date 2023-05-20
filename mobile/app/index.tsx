import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as SecureStore from "expo-secure-store";

import SpacetimeLogo from "../src/assets/spacetime-logo.svg";
import { api } from "../src/lib/api";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/dba1fa394db556bc9520",
};

export default function App() {
  const router = useRouter();

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: "dba1fa394db556bc9520",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "spacetime",
      }),
    },
    discovery
  );

  const handleGithubOAuthCode = async (code: string) => {
    const response = await api.post("/register", {
      code,
    });
    const { token } = response.data;

    await SecureStore.setItemAsync("token", token);

    router.push("/memories");
  };

  useEffect(() => {
    /* console.log(
      makeRedirectUri({
        scheme: "spacetime",
      })
    ); */

    if (response?.type === "success") {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  return (
    <View className=" flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <SpacetimeLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            COMEÇAR A CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        MuriloNP
      </Text>
    </View>
  );
}
