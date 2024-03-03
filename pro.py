from chatterbot import ChatBot

# Create a new instance of a ChatBot
bot = ChatBot('Buddy', storage_adapter='chatterbot.storage.SQLStorageAdapter')

# Get the user's input from the command line argument
user_input = input()

# Get the response from the ChatBot
response = bot.get_response(user_input)

# Print the response
print(response)
