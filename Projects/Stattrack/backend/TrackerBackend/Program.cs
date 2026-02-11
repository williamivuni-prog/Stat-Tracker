using Supabase;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

var url = "https://your-url.supabase.co";
var key = "your-anon-key";

var options = new SupabaseOptions { AutoConnectClient = true };
var supabase = new Supabase.Client(url, key, options);
await supabase.InitializeAsync();

// Fetch all matches
var response = await supabase.From<Match>().Get();
var matches = response.Models;

var winCount = matches.Count(m => m.Result == "Win");

Console.WriteLine($"--- STAT TRACKER REPORT ---");
Console.WriteLine($"Total Matches Tracked: {matches.Count}");
Console.WriteLine($"Total Wins: {winCount}");
Console.WriteLine($"---------------------------");

[Table("matches")]
public class Match : BaseModel {
    [Column("hero_name")] public string HeroName { get; set; }
    [Column("role")] public string Role { get; set; }
    [Column("result")] public string Result { get; set; }
}