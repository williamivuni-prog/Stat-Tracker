// Replace these with the actual strings you copied from Supabase
const supabaseUrl = 'https://kucfjwrubvkspubucbed.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1Y2Zqd3J1YnZrc3B1YnVjYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NjkyNDQsImV4cCI6MjA4NjI0NTI0NH0.6BryyjU3H8IP83hZFJbZizUXeqSdwWS5ays1e-OlCcc';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const matchForm = document.getElementById('matchForm');

matchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const hero = document.getElementById('heroName').value;
    const role = document.getElementById('role').value;
    const result = document.getElementById('result').value;

    // This sends the data to your 'matches' table in Supabase
    const { data, error } = await supabaseClient
        .from('matches')
        .insert([{ hero_name: hero, role: role, result: result }]);

    if (error) {
        alert('Error saving match!');
        console.error(error);
    } else {
        alert('Match saved to the cloud!');
        matchForm.reset();
    }

    async function displayMatches() {
    const { data: matches, error } = await supabaseClient
        .from('matches')
        .select('*');

    if (error) {
        console.error('Error fetching matches:', error);
    } else {
        console.log('Your Matches:', matches);
        // You can now write code here to display them in a <ul> in your HTML
    }
}

// Call this function when the page loads
displayMatches();

async function loadMatches() {
    const { data: matches, error } = await supabaseClient
        .from('matches')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return console.error(error);

    const list = document.getElementById('matchList');
    list.innerHTML = ''; // Clear old list

    matches.forEach(m => {
        const li = document.createElement('li');
        li.textContent = `${m.hero_name} - ${m.role} - ${m.result}`;
        list.appendChild(li);
    });
}

// Update your existing event listener to call loadMatches()
// Inside your "else" block for the alert, add:
// loadMatches();

loadMatches(); // Run on startup
});