#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *longestPalindrome(char *s) {

    int i = 0, original_length = strlen(s);
    int longest = 0, start_index;
    char *str;

    if (original_length == 1)
        return s;

    do {
        int k = 1;
        int j = 1;

        if ((original_length - i) * 2 + 1 < longest)
            break;

        while (i + k < original_length && s[i] == s[i + k])
            k++;

        while (i - j >= 0 && i + k - 1 + j < original_length && s[i - j] == s[i + k - 1 + j])
            j++;

        if ((j - 1) * 2 + k > longest) {
            longest = (j - 1) * 2 + k;
            start_index = i - (j - 1);
        }

        i += k - 1 > 0 ? k - 1 : 1;
    } while (i < original_length - 1);

    str = (char *) malloc(longest + 1);
    memcpy(str, s + start_index, longest);
    str[longest] = 0;

    return str;
}

char *longestPalindrome2(char *s) {
    int ori_length = strlen(s);

    if (ori_length == 1 || ori_length == 2) {
        return s;
    }

    int extend_length = ori_length * 2 + 1;
    char *T = (char *) malloc((extend_length + 1) * sizeof(char));

    T[0] = '#';
    int i, s_index = 0;
    for (i = 1; i < extend_length; i++) {
        if (i % 2 == 1) {
            T[i] = s[s_index++];
        }
        else {
            T[i] = '#';
        }
    }
    T[extend_length] = '\0';

    int *P = (int *) malloc(extend_length * sizeof(int));
    memset(P, 0, extend_length * sizeof(int));

    int C = 0, R = 0;
    for (i = 1; i < extend_length; i++) {
        int x = R - i > P[C - (i - C)] ? P[C - (i - C)] : R - i;
        P[i] = R > i ? x : 0;
        while (i + 1 + P[i] < extend_length && i - 1 - P[i] >= 0 && T[i + 1 + P[i]] == T[i - 1 - P[i]]) {
            P[i] += 1;
        }
        if (i + P[i] > R) {
            C = i;
            R = i + P[i];
        }
    }

    int maxLen = 0, centerIndex = 0;
    for (i = 0; i < extend_length; i++) {
        if (P[i] > maxLen) {
            maxLen = P[i];
            centerIndex = i;
        }
    }

    free(T);
    free(P);

    int firstIndex = (centerIndex - maxLen) / 2;
    int lastIndex = (centerIndex + maxLen) / 2;
    int length = lastIndex - firstIndex;
    char *ret = (char *) malloc((length + 1) * sizeof(char));
    memcpy(ret, s + firstIndex, length);
    ret[length] = '\0';
    return ret;
}




int main() {


    printf("%s\n", longestPalindrome2("babcbabcbaccba"));
}