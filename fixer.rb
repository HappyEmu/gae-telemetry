require 'json'
file = File.open("run1.csv")
file2 = File.open("run1_fixed.json",'w')
bighash = []
file.each_line do |line|
  hash = eval line
  bighash << hash
end

bighash.each do |line|
  file2.puts line.to_json
end
