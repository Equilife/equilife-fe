import { router } from "expo-router";
import { useEffect } from "react";

export default function QuestionnaireIndex() {
    useEffect(() => {
        // Auto redirect to first questionnaire screen
        router.replace("./name");
    }, []);

    return null;
}
