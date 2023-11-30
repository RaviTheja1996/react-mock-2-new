/* eslint-disable react-hooks/rules-of-hooks */
import {
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  HStack,
  Image,
  Text,
  Box,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiSolidLike } from "react-icons/bi";
import { Icon } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const forum = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDesc, setQuestionDesc] = useState("");
  const [questionLang, setQuestionLang] = useState("");
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editId, setEditId] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const username = useSelector((store) => store.username);
  const avatar = useSelector((store) => store.avatar);

  const incLikes = (id, curr) => {
    axios.patch(
      `https://react-mock-2-json-server.onrender.com/forum?id=${id}`,
      {
        question: {
          upvotes: curr + 1,
        },
      }
    );
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const openModal = () => {
    setEditModalOpen(true);
  };

  const editCall = () => {
    axios.patch(
      `https://react-mock-2-json-server.onrender.com/forum?id=${editId}`,
      {
        question: {
          questionTitle: editTitle,
        },
      }
    );
  };

  const handleEdit = (id) => {
    openModal();
    setEditId(id);
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://react-mock-2-json-server.onrender.com/forum?id=${id}`)
      .then(() => {
        DomDataAppend(page, filter, sort);
      });
  };

  const card = (obj, answers, id) => {
    return (
      <>
        <HStack spacing={6}>
          <VStack spacing={4}>
            <Image src={obj.userAvatar} />
            <Text fontSize="md">{obj.username}</Text>
          </VStack>
          <VStack spacing={4}>
            <Text fontSize="xl">{obj.questionTitle}</Text>
            <HStack spacing={6}>
              <Box bgColor="#e2ded5">{obj.language}</Box>
              <Box bgColor="#e2ded5">{obj.postedDate}</Box>
              <Box bgColor="#e2ded5">{`${answers.length} Answers`}</Box>
            </HStack>
            <VStack>
              <Box onClick={incLikes(id, Number(obj.upvotes))}>
                <BiSolidLike />
              </Box>
              <Text>{`${obj.upvotes} Upvotes`}</Text>
            </VStack>
          </VStack>
        </HStack>
        {obj.username === username && (
          <HStack spacing={6}>
            <Button bgColor="#6d7ae2" color="white" onClick={handleEdit(id)}>
              Edit
            </Button>
            <Modal isOpen={editModalOpen} onClose={closeModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    placeholder="Enter question title"
                    value={editTitle}
                    onChange={(e) => {
                      setEditTitle(e.target.value);
                    }}
                  />
                  <Button onClick={editCall}>Submit</Button>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button bgColor="tomato" color="white" onClick={handleDelete(id)}>
              Delete
            </Button>
          </HStack>
        )}
      </>
    );
  };

  const DomDataAppend = (page, filter, sort) => {
    if (filter === "" && sort === "") {
      axios
        .get(
          `https://react-mock-2-json-server.onrender.com/forum?limit=5&page=${page}`
        )
        .then((res) => {
          let data = res.data;
          let cardsArr = data.map((el) => {
            return card(el.question, el.answers, el.id);
          });
          setCards(cardsArr);
        });
    } else if (filter !== "" && sort === "") {
      axios
        .get(
          `https://react-mock-2-json-server.onrender.com/forum?limit=5&page=${page}&question.language=${filter}`
        )
        .then((res) => {
          let data = res.data;
          let cardsArr = data.map((el) => {
            return card(el.question, el.answers, el.id);
          });
          setCards(cardsArr);
        });
    } else if (filter === "" && sort !== "") {
      axios
        .get(
          `https://react-mock-2-json-server.onrender.com/forum?limit=5&page=${page}_sort=question.upvotes&_order=${sort}`
        )
        .then((res) => {
          let data = res.data;
          let cardsArr = data.map((el) => {
            return card(el.question, el.answers, el.id);
          });
          setCards(cardsArr);
        });
    } else if (filter !== "" && sort !== "") {
      axios
        .get(
          `https://react-mock-2-json-server.onrender.com/forum?limit=5&page=${page}_sort=question.upvotes&_order=${sort}&question.language=${filter}`
        )
        .then((res) => {
          let data = res.data;
          let cardsArr = data.map((el) => {
            return card(el.question, el.answers, el.id);
          });
          setCards(cardsArr);
        });
    }
  };

  useEffect(() => {
    DomDataAppend(page, filter, sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter, sort]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://react-mock-2-json-server.onrender.com/forum", {
      question: {
        username,
        userAvatar: avatar,
        questionTitle,
        questionDescription: questionDesc,
        language: questionLang,
        upvotes: 0,
        answers: 0,
        postedDate: Date(),
      },
      answers: [],
    });
  };

  return (
    <VStack spacing={8}>
      <Button onClick={onOpen}>Ask Question</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Question Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Enter Question Title"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Enter Question Description"
                value={questionDesc}
                onChange={(e) => setQuestionDesc(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Enter Question Language"
                value={questionLang}
                onChange={(e) => setQuestionLang(e.target.value)}
              />
              <Button type="submit">Post Question</Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack spacing={6}>
        <Text>filter :</Text>
        <Select
          placeholder="Select Language"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="">Reset</option>
          <option value="Javascript">Javascript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
        </Select>
      </HStack>
      <HStack spacing={6}>
        <Text>sort :</Text>
        <Select
          placeholder="Select upvotes order"
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="">Reset</option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </Select>
      </HStack>
      {cards.map((el) => {
        return el;
      })}
      <HStack>
        <Icon
          as={ArrowBackIcon}
          onClick={() => {
            if (page > 1) {
              setPage((prev) => prev - 1);
            }
          }}
        />
        <Text fontSize={"lg"}>{page}</Text>
        <Icon
          as={ArrowForwardIcon}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        />
      </HStack>
    </VStack>
  );
};

export default forum;
