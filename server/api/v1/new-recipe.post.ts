import OpenAI from 'openai'
import { PromptsEnums } from "~/enums/PromptsEnums";

const config = useRuntimeConfig()

const openai = new OpenAI({
	apiKey: config.openAIApiKey
})

export default defineEventHandler(async (event) => {
	try {
		const { payload } = await readBody(event)

		if (!payload) {
			return 'No payload received!'
		}

		console.log(payload)

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content: PromptsEnums.SYSTEM_PROMPT,
				},
				{
					role: 'user',
					content: `Create a recipe with the following requirements:
						- Number of portions: ${ payload.portionSize }
						- Maximum cooking time: ${ payload.cookingTime } minutes
						- Cook's experience level: ${ payload.cookingExperience }
						${ payload.additionalNotes ? `- Additional requirement: ${ payload.additionalNotes }` : '' }
						
						Please provide a complete recipe with ingredients list and detailed instructions.`
				}
			]
		})

		return completion.choices[ 0 ].message

	} catch (error) {
		console.error('OpenAI API error:', error)
		throw createError({
			statusCode: 500,
			message: 'Error processing your request'
		})
	}
})