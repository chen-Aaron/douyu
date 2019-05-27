# encoding=utf-8
# import jieba.posseg as pseg
# words = pseg.cut("今天还播吗 有人知道不")

# import turtle

# window = turtle.Screen();

# babblage = turtle.Turtle();

# babblage.forward(90);

# babblage.right(90)

# babblage.forward(90)



# window.exitonclick();
import turtle
import sys
from pyside.QtCore import *
from pyside.QtGui import *

class TurtleContro(QWidget):
    def __init__(self, turtle):
        super(TurtleControl, self).__init__()
        self.turtle = turtle

        self.left_btn = QPushButton('Left', self)
        self.right_btn = QPushButton('Right', self)
        self.move_btn = QPushButton('Move', self)
        self.distance_spin = QSpinBox()

        self.controlsLayout = QGridLayout()
        self.controlsLayout.addWidget(self.left_btn, 0, 0)
        self.controlsLayout.addWidget(self.right_btn, 0, 1)
        self.controlsLayout.addWidget(self.distance_spin, 1, 0)
        self.controlsLayout.addWidget(self.move_btn, 1, 1)
        self.setLayout(self.controlsLayout)

        self.distance_spin.setRange(0, 100)
        self.distance_spin.setSingleStep(5)
        self.distance_spin.setValue(20)


window = turtle.Screen()
babbage = turtle.Turtle()

app = QApplication(sys.argv)
control_window = TurtleControl(babbage)
control_window.show()

app.exec_()
sys.exit()