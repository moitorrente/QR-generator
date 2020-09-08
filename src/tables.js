const MODE = {
    numeric: '0001',
    alphanumeric: '0010',
    byte: '0100',
    kanji: '1000'
}

const MATRIX = {
    '1': 21,
    '2': 25,
    '3': 29,
    '4': 33,
    '5': 37,
    '6': 41,
}

const REMAINDER = {
    '1': 0,
    '2': 7,
    '3': 7,
    '4': 7,
    '5': 7,
    '6': 7
}

const CORRECTIONTABLE = {
    '1-L': 19,
    '1-M': 16,
    '1-Q': 13,
    '1-H': 9,

    '2-L': 34,
    '2-M': 28,
    '2-Q': 22,
    '2-H': 16,

    '3-L': 55,
    '3-M': 44,
    '3-Q': 34,
    '3-H': 26,

    '4-L': 80,
    '4-M': 64,
    '4-Q': 48,
    '4-H': 36,

    '5-L': 108,
    '5-M': 86,
    '5-Q': 62,
    '5-H': 46,

    '6-L': 136,
    '6-M': 108,
    '6-Q': 76,
    '6-H': 60,
}

const ECCODEWORDS = {
    '1-L': 7,
    '1-M': 10,
    '1-Q': 13,
    '1-H': 17,

    '2-L': 10,
    '2-M': 16,
    '2-Q': 22,
    '2-H': 28,
 
    '3-L': 15,
    '3-M': 26,
    '3-Q': 18,
    '3-H': 22,

    '4-L': 20,
    '4-M': 18,
    '4-Q': 26,
    '4-H': 16,

    '5-L': 26,
    '5-M': 24,
    '5-Q': 18,
    '5-H': 22,

    '6-L': 18,
    '6-M': 16,
    '6-Q': 24,
    '6-H': 28
}

const ALPHAEXP = {
    7: [0, 87, 229, 146, 149, 238, 102, 21],
    10: [0, 251, 67, 46, 61, 118, 70, 64, 94, 32, 45],
    13: [0, 74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78],
    15: [0, 8, 183, 61, 91, 202, 37, 51, 58, 58, 237, 140, 124, 5, 99, 105],
    16: [0, 120, 104, 107, 109, 102, 161, 76, 3, 91, 191, 147, 169, 182, 194, 225, 120],
    17: [0, 43, 139, 206, 78, 43, 239, 123, 206, 214, 147, 24, 99, 150, 39, 243, 163, 136],
    18: [0, 215, 234, 158, 94, 184, 97, 118, 170, 79, 187, 152, 148, 252, 179, 5, 98, 96, 153],
    20: [0, 17, 60, 79, 50, 61, 163, 26, 187, 202, 180, 221, 225, 83, 239, 156, 164, 212, 212, 188, 190],
    22: [0, 210, 171, 247, 242, 93, 230, 14, 109, 221, 53, 200, 74, 8, 172, 98, 80, 219, 134, 160, 105, 165, 231],
    26: [0, 173, 125, 158, 2, 103, 182, 118, 17, 145, 201, 111, 28, 165, 53, 161, 21, 245, 142, 13, 102, 48, 227, 153, 145, 218, 70],
    28: [0, 168, 223, 200, 104, 224, 234, 108, 180, 110, 190, 195, 147, 205, 27, 232, 201, 21, 43, 245, 87, 42, 195, 212, 119, 242, 37, 9, 123]
}

const FORMATINFORMATION = {
    0: {
        L: '111011111000100',
        M: '101010000010010',
        Q: '011010101011111',
        H: '001011010001001'
    },
    1: {
        L: '111001011110011',
        M: '101000100100101',
        Q: '011000001101000',
        H: '001001110111110'
    },
    2: {
        L: '111110110101010',
        M: '101111001111100',
        Q: '011111100110001',
        H: '001110011100111'
    },
    3: {
        L: '111100010011101',
        M: '101101101001011',
        Q: '011101000000110',
        H: '001100111010000'
    },
    4: {
        L: '110011000101111',
        M: '100010111111001',
        Q: '010010010110100',
        H: '000011101100010'
    },
    5: {
        L: '110001100011000',
        M: '100000011001110',
        Q: '010000110000011',
        H: '000001001010101'
    },
    6: {
        L: '110110001000001',
        M: '100111110010111',
        Q: '010111011011010',
        H: '000110100001100'
    },
    7: {
        L: '110100101110110',
        M: '100101010100000',
        Q: '010101111101101',
        H: '000100000111011'
    }
}

const CAPACITIES = {
    1: {
        L: {
            numeric: 41,
            alphanumeric: 25,
            byte: 17
        },
        M: {
            numeric: 34,
            alphanumeric: 20,
            byte: 14
        },
        Q: {
            numeric: 27,
            alphanumeric: 16,
            byte: 11
        },
        H: {
            numeric: 17,
            alphanumeric: 10,
            byte: 7
        }
    },
    2: {
        L: {
            numeric: 77,
            alphanumeric: 47,
            byte: 32
        },
        M: {
            numeric: 63,
            alphanumeric: 38,
            byte: 26
        },
        Q: {
            numeric: 48,
            alphanumeric: 29,
            byte: 20
        },
        H: {
            numeric: 34,
            alphanumeric: 20,
            byte: 14
        }
    },
    3: {
        L: {
            numeric: 127,
            alphanumeric: 77,
            byte: 53
        },
        M: {
            numeric: 101,
            alphanumeric: 61,
            byte: 42
        },
        Q: {
            numeric: 77,
            alphanumeric: 47,
            byte: 32
        },
        H: {
            numeric: 58,
            alphanumeric: 35,
            byte: 24
        }
    },
    4: {
        L: {
            numeric: 187,
            alphanumeric: 114,
            byte: 78
        },
        M: {
            numeric: 149,
            alphanumeric: 90,
            byte: 62
        },
        Q: {
            numeric: 111,
            alphanumeric: 67,
            byte: 46
        },
        H: {
            numeric: 82,
            alphanumeric: 50,
            byte: 34
        }
    },


    5: {
        L: {
            numeric: 255,
            alphanumeric: 154,
            byte: 106
        },
        M: {
            numeric: 202,
            alphanumeric: 122,
            byte: 84
        },
        Q: {
            numeric: 144,
            alphanumeric: 87,
            byte: 60
        },
        H: {
            numeric: 106,
            alphanumeric: 64,
            byte: 44
        }
    },

    6: {
        L: {
            numeric: 322,
            alphanumeric: 195,
            byte: 134
        },
        M: {
            numeric: 255,
            alphanumeric: 154,
            byte: 106
        },
        Q: {
            numeric: 178,
            alphanumeric: 108,
            byte: 74
        },
        H: {
            numeric: 139,
            alphanumeric: 84,
            byte: 58
        }
    }
}

const FORMATINFORMATION0 = {
    L: '111011111000100',
    M: '101010000010010',
    Q: '011010101011111',
    H: '001011010001001'
}

const FORMATINFORMATION1 = {
    L: '111001011110011',
    M: '101000100100101',
    Q: '011000001101000',
    H: '001001110111110'
}

const LENGTH = {
    numeric: 10,
    alphanumeric: 9,
    byte: 8,
    kanji: 8,
}

const LOGTABLE = {
    0: 1
    , 1: 2
    , 2: 4
    , 3: 8
    , 4: 16
    , 5: 32
    , 6: 64
    , 7: 128
    , 8: 29
    , 9: 58
    , 10: 116
    , 11: 232
    , 12: 205
    , 13: 135
    , 14: 19
    , 15: 38
    , 16: 76
    , 17: 152
    , 18: 45
    , 19: 90
    , 20: 180
    , 21: 117
    , 22: 234
    , 23: 201
    , 24: 143
    , 25: 3
    , 26: 6
    , 27: 12
    , 28: 24
    , 29: 48
    , 30: 96
    , 31: 192
    , 32: 157
    , 33: 39
    , 34: 78
    , 35: 156
    , 36: 37
    , 37: 74
    , 38: 148
    , 39: 53
    , 40: 106
    , 41: 212
    , 42: 181
    , 43: 119
    , 44: 238
    , 45: 193
    , 46: 159
    , 47: 35
    , 48: 70
    , 49: 140
    , 50: 5
    , 51: 10
    , 52: 20
    , 53: 40
    , 54: 80
    , 55: 160
    , 56: 93
    , 57: 186
    , 58: 105
    , 59: 210
    , 60: 185
    , 61: 111
    , 62: 222
    , 63: 161
    , 64: 95
    , 65: 190
    , 66: 97
    , 67: 194
    , 68: 153
    , 69: 47
    , 70: 94
    , 71: 188
    , 72: 101
    , 73: 202
    , 74: 137
    , 75: 15
    , 76: 30
    , 77: 60
    , 78: 120
    , 79: 240
    , 80: 253
    , 81: 231
    , 82: 211
    , 83: 187
    , 84: 107
    , 85: 214
    , 86: 177
    , 87: 127
    , 88: 254
    , 89: 225
    , 90: 223
    , 91: 163
    , 92: 91
    , 93: 182
    , 94: 113
    , 95: 226
    , 96: 217
    , 97: 175
    , 98: 67
    , 99: 134
    , 100: 17
    , 101: 34
    , 102: 68
    , 103: 136
    , 104: 13
    , 105: 26
    , 106: 52
    , 107: 104
    , 108: 208
    , 109: 189
    , 110: 103
    , 111: 206
    , 112: 129
    , 113: 31
    , 114: 62
    , 115: 124
    , 116: 248
    , 117: 237
    , 118: 199
    , 119: 147
    , 120: 59
    , 121: 118
    , 122: 236
    , 123: 197
    , 124: 151
    , 125: 51
    , 126: 102
    , 127: 204
    , 128: 133
    , 129: 23
    , 130: 46
    , 131: 92
    , 132: 184
    , 133: 109
    , 134: 218
    , 135: 169
    , 136: 79
    , 137: 158
    , 138: 33
    , 139: 66
    , 140: 132
    , 141: 21
    , 142: 42
    , 143: 84
    , 144: 168
    , 145: 77
    , 146: 154
    , 147: 41
    , 148: 82
    , 149: 164
    , 150: 85
    , 151: 170
    , 152: 73
    , 153: 146
    , 154: 57
    , 155: 114
    , 156: 228
    , 157: 213
    , 158: 183
    , 159: 115
    , 160: 230
    , 161: 209
    , 162: 191
    , 163: 99
    , 164: 198
    , 165: 145
    , 166: 63
    , 167: 126
    , 168: 252
    , 169: 229
    , 170: 215
    , 171: 179
    , 172: 123
    , 173: 246
    , 174: 241
    , 175: 255
    , 176: 227
    , 177: 219
    , 178: 171
    , 179: 75
    , 180: 150
    , 181: 49
    , 182: 98
    , 183: 196
    , 184: 149
    , 185: 55
    , 186: 110
    , 187: 220
    , 188: 165
    , 189: 87
    , 190: 174
    , 191: 65
    , 192: 130
    , 193: 25
    , 194: 50
    , 195: 100
    , 196: 200
    , 197: 141
    , 198: 7
    , 199: 14
    , 200: 28
    , 201: 56
    , 202: 112
    , 203: 224
    , 204: 221
    , 205: 167
    , 206: 83
    , 207: 166
    , 208: 81
    , 209: 162
    , 210: 89
    , 211: 178
    , 212: 121
    , 213: 242
    , 214: 249
    , 215: 239
    , 216: 195
    , 217: 155
    , 218: 43
    , 219: 86
    , 220: 172
    , 221: 69
    , 222: 138
    , 223: 9
    , 224: 18
    , 225: 36
    , 226: 72
    , 227: 144
    , 228: 61
    , 229: 122
    , 230: 244
    , 231: 245
    , 232: 247
    , 233: 243
    , 234: 251
    , 235: 235
    , 236: 203
    , 237: 139
    , 238: 11
    , 239: 22
    , 240: 44
    , 241: 88
    , 242: 176
    , 243: 125
    , 244: 250
    , 245: 233
    , 246: 207
    , 247: 131
    , 248: 27
    , 249: 54
    , 250: 108
    , 251: 216
    , 252: 173
    , 253: 71
    , 254: 142
    , 255: 1
}

const CONVERSIONTABLE = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15,
    'G': 16,
    'H': 17,
    'I': 18,
    'J': 19,
    'K': 20,
    'L': 21,
    'M': 22,
    'N': 23,
    'O': 24,
    'P': 25,
    'Q': 26,
    'R': 27,
    'S': 28,
    'T': 29,
    'U': 30,
    'V': 31,
    'W': 32,
    'X': 33,
    'Y': 34,
    'Z': 35,
    ' ': 36,
    '$': 37,
    '%': 38,
    '*': 39,
    '+': 40,
    '-': 41,
    '.': 42,
    '/': 43,
    ':': 44
}

const ANTILOGTABLE = {
    1: 0
    , 2: 1
    , 3: 25
    , 4: 2
    , 5: 50
    , 6: 26
    , 7: 198
    , 8: 3
    , 9: 223
    , 10: 51
    , 11: 238
    , 12: 27
    , 13: 104
    , 14: 199
    , 15: 75
    , 16: 4
    , 17: 100
    , 18: 224
    , 19: 14
    , 20: 52
    , 21: 141
    , 22: 239
    , 23: 129
    , 24: 28
    , 25: 193
    , 26: 105
    , 27: 248
    , 28: 200
    , 29: 8
    , 30: 76
    , 31: 113
    , 32: 5
    , 33: 138
    , 34: 101
    , 35: 47
    , 36: 225
    , 37: 36
    , 38: 15
    , 39: 33
    , 40: 53
    , 41: 147
    , 42: 142
    , 43: 218
    , 44: 240
    , 45: 18
    , 46: 130
    , 47: 69
    , 48: 29
    , 49: 181
    , 50: 194
    , 51: 125
    , 52: 106
    , 53: 39
    , 54: 249
    , 55: 185
    , 56: 201
    , 57: 154
    , 58: 9
    , 59: 120
    , 60: 77
    , 61: 228
    , 62: 114
    , 63: 166
    , 64: 6
    , 65: 191
    , 66: 139
    , 67: 98
    , 68: 102
    , 69: 221
    , 70: 48
    , 71: 253
    , 72: 226
    , 73: 152
    , 74: 37
    , 75: 179
    , 76: 16
    , 77: 145
    , 78: 34
    , 79: 136
    , 80: 54
    , 81: 208
    , 82: 148
    , 83: 206
    , 84: 143
    , 85: 150
    , 86: 219
    , 87: 189
    , 88: 241
    , 89: 210
    , 90: 19
    , 91: 92
    , 92: 131
    , 93: 56
    , 94: 70
    , 95: 64
    , 96: 30
    , 97: 66
    , 98: 182
    , 99: 163
    , 100: 195
    , 101: 72
    , 102: 126
    , 103: 110
    , 104: 107
    , 105: 58
    , 106: 40
    , 107: 84
    , 108: 250
    , 109: 133
    , 110: 186
    , 111: 61
    , 112: 202
    , 113: 94
    , 114: 155
    , 115: 159
    , 116: 10
    , 117: 21
    , 118: 121
    , 119: 43
    , 120: 78
    , 121: 212
    , 122: 229
    , 123: 172
    , 124: 115
    , 125: 243
    , 126: 167
    , 127: 87
    , 128: 7
    , 129: 112
    , 130: 192
    , 131: 247
    , 132: 140
    , 133: 128
    , 134: 99
    , 135: 13
    , 136: 103
    , 137: 74
    , 138: 222
    , 139: 237
    , 140: 49
    , 141: 197
    , 142: 254
    , 143: 24
    , 144: 227
    , 145: 165
    , 146: 153
    , 147: 119
    , 148: 38
    , 149: 184
    , 150: 180
    , 151: 124
    , 152: 17
    , 153: 68
    , 154: 146
    , 155: 217
    , 156: 35
    , 157: 32
    , 158: 137
    , 159: 46
    , 160: 55
    , 161: 63
    , 162: 209
    , 163: 91
    , 164: 149
    , 165: 188
    , 166: 207
    , 167: 205
    , 168: 144
    , 169: 135
    , 170: 151
    , 171: 178
    , 172: 220
    , 173: 252
    , 174: 190
    , 175: 97
    , 176: 242
    , 177: 86
    , 178: 211
    , 179: 171
    , 180: 20
    , 181: 42
    , 182: 93
    , 183: 158
    , 184: 132
    , 185: 60
    , 186: 57
    , 187: 83
    , 188: 71
    , 189: 109
    , 190: 65
    , 191: 162
    , 192: 31
    , 193: 45
    , 194: 67
    , 195: 216
    , 196: 183
    , 197: 123
    , 198: 164
    , 199: 118
    , 200: 196
    , 201: 23
    , 202: 73
    , 203: 236
    , 204: 127
    , 205: 12
    , 206: 111
    , 207: 246
    , 208: 108
    , 209: 161
    , 210: 59
    , 211: 82
    , 212: 41
    , 213: 157
    , 214: 85
    , 215: 170
    , 216: 251
    , 217: 96
    , 218: 134
    , 219: 177
    , 220: 187
    , 221: 204
    , 222: 62
    , 223: 90
    , 224: 203
    , 225: 89
    , 226: 95
    , 227: 176
    , 228: 156
    , 229: 169
    , 230: 160
    , 231: 81
    , 232: 11
    , 233: 245
    , 234: 22
    , 235: 235
    , 236: 122
    , 237: 117
    , 238: 44
    , 239: 215
    , 240: 79
    , 241: 174
    , 242: 213
    , 243: 233
    , 244: 230
    , 245: 231
    , 246: 173
    , 247: 232
    , 248: 116
    , 249: 214
    , 250: 244
    , 251: 234
    , 252: 168
    , 253: 80
    , 254: 88
    , 255: 175
}