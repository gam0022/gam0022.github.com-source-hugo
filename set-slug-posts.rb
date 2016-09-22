dir = 'content/post/'
Dir::foreach(dir) do |filename|
  if filename =~ /.markdown$/
    slug = filename.gsub(/\d{4}-\d{2}-\d{2}-/, '').sub('.markdown', '')
    puts "#{filename} : #{slug}"

    lines = []
    File::open(dir + filename) do |f|
      f.each do |line| 
        lines << line
      end
    end

    File::open(dir + filename, 'w') do |f|
      lines.each_with_index do |line, i|
        f.puts("slug: #{slug}") if i == 3
        f.print(line)
      end
    end
  end
end
