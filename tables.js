const MODE = {
    numeric: '0001',
    alphanumeric: '0010',
    byte: '0100',
    kanji: '1000'
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
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 18,
    J: 19,
    K: 20,
    L: 21,
    M: 22,
    N: 23,
    O: 24,
    P: 25,
    Q: 26,
    R: 27,
    S: 28,
    T: 29,
    U: 30,
    V: 31,
    W: 32,
    X: 33,
    Y: 34,
    Z: 35,
    " ": 36,
    "$": 37,
    "%": 38,
    "*": 39,
    "+": 40,
    "-": 41,
    ".": 42,
    "/": 43,
    ":": 44
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