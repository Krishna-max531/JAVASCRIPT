#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

struct Dragon {
    int r, c;
};

bool compareDragons(const Dragon& a, const Dragon& b) {
    return a.r < b.r;
}

int main() {
    int R, C, K, D;
    cin >> R >> C >> K >> D;

    vector<Dragon> dragons(D);
    for (int i = 0; i < D; ++i) {
        cin >> dragons[i].r >> dragons[i].c;
    }

    sort(dragons.begin(), dragons.end(), compareDragons);

    vector<vector<long long>> dp(D, vector<long long>(K + 1, LLONG_MAX));

    // Base case: Kill 1 dragon
    for (int i = 0; i < D; ++i) {
        dp[i][1] = dragons[i].r + dragons[i].c;
    }

    // DP transition
    for (int j = 2; j <= K; ++j) {
        for (int i = 0; i < D; ++i) {
            for (int p = 0; p < i; ++p) {
                if (dp[p][j - 1] != LLONG_MAX) {
                    long long cost = dp[p][j - 1] +
                                     (dragons[i].r - dragons[p].r) +
                                     abs(dragons[i].c - dragons[p].c);
                    dp[i][j] = min(dp[i][j], cost);
                }
            }
        }
    }

    // Find the minimum distance to kill K dragons
    long long min_total_dist = LLONG_MAX;
    for (int i = 0; i < D; ++i) {
        min_total_dist = min(min_total_dist, dp[i][K]);
    }

    cout << min_total_dist << endl;
    return 0;
}
